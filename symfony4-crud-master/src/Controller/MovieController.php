<?php

namespace App\Controller;

use App\Entity\Movie;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;

class MovieController extends Controller
{
    /**
     * @Route("/movies/", name="movie_list")
     * @Method({"GET"})
     * @return Response
     */
    public function index()
    {
        $articles = $this->getDoctrine()->getRepository(Movie::class)->findAll();
        return $this->render('movies/index.html.twig', array('articles' => $articles));
    }

    /**
     * @Route("/movies/new",name="new_movie")
     * @Method({"GET","POST"})
     */
    public function new(Request $request)
    {
        $article = new Movie();
        $form = $this->createFormBuilder($article)
            ->add('name', TextType::class, array('attr' => array('class' => 'form-control')))
            ->add('address', TextType::class, array('required' => FALSE, 'attr' => array('class' => 'form-control')))
            ->add('save', SubmitType::class, array('label' => 'Create', 'attr' => array('class' => 'btn btn-primary mt-3')))
            
            ->getForm();
        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            $article = $form->getData();
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($article);
            $entityManager->flush();
            return $this->redirectToRoute('movie_list');
        }
        return $this->render('movies/new.html.twig', array('form' => $form->createView()));
    }

    /**
     * @Route("/movie/{id}", name = "movie_show")
     * @Method({"GET"})
     */

    public function show($id) {
        $movie = $this->getDoctrine()->getRepository(Movie::class)->find($id);
        return $this->render('movies/show.html.twig', array('article' => $movie));
    }

    /**
     * @Route("/movie/delete/{id}")
     * @Method({"DELETE"})
     */

    public function delete(Request $request, $id)
    {
        $article = $this->getDoctrine()->getRepository(Movie::class)->find($id);
        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->remove($article);
        $entityManager->flush();
        $response = new Response();
        $response->send();
    }

     /**
     * @Route("/movie/edit/{id}",name="edit_article")
     * @Method({"GET","POST"})
     */
    public function edit(Request $request, $id)
    {
        $article = $this->getDoctrine()->getRepository(Movie::class)->find($id);
        $form = $this->createFormBuilder($article)
            ->add('name', TextType::class, array('attr' => array('class' => 'form-control')))
            ->add('address', TextType::class, array('required' => FALSE, 'attr' => array('class' => 'form-control')))
            ->add('save', SubmitType::class, array('label' => 'Update', 'attr' => array('class' => 'btn btn-primary mt-3')))
            ->getForm();
        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->flush();
            return $this->redirectToRoute('movie_list');
        }
        return $this->render('movies/edit.html.twig', array('form' => $form->createView()));
    }

   
   
}